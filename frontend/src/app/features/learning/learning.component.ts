import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="learning-dashboard">
      <!-- Input Concept -->
      <div *ngIf="!modules().length && !loading()" class="glass-container input-section">
        <h2>What do you want to learn?</h2>
        <input 
          class="glass-input" 
          [(ngModel)]="topic" 
          placeholder="e.g. Quantum Physics, React Hooks..." 
          (keyup.enter)="startLearning()"
        />
        <div style="margin-top: 1rem; display: flex; gap: 1rem;">
          <select class="glass-input" [(ngModel)]="difficulty" style="width: auto;">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <button class="glass-button" (click)="startLearning()" [disabled]="!topic()">
            Generate Modules
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading()" class="glass-container loading-section">
        <p>Analyzing topic and generating learning path...</p>
        <div class="spinner"></div>
      </div>

      <!-- Modules List -->
      <div *ngIf="modules().length && !activeModuleId()" class="glass-container module-list">
        <h2>Your Learning Path: {{ topic() }}</h2>
        <div class="modules-grid">
          <div *ngFor="let mod of modules()" class="glass-container module-card" (click)="openModule(mod.id)">
            <h3>{{ mod.title }}</h3>
            <button class="glass-button">Start Module</button>
          </div>
        </div>
      </div>

      <!-- Active Module View -->
      <div *ngIf="activeModule()" class="glass-container active-module">
        <button class="glass-button back-btn" (click)="closeModule()">← Back to Path</button>
        <h2>{{ activeModule()?.title }}</h2>
        <p class="module-content">{{ activeModule()?.content }}</p>

        <!-- Quiz Section -->
        <div *ngIf="activeModule()?.quizQuestions as questions" class="quiz-section">
          <h3>Knowledge Check</h3>
          <div *ngFor="let q of questions; let i = index" class="question">
            <p>{{ q.text }}</p>
            <div class="options">
              <label *ngFor="let opt of q.options; let optIdx = index" class="option-label">
                <input type="radio" [name]="'q' + i" [value]="optIdx" (change)="selectAnswer(q.id, optIdx)"/>
                {{ opt }}
              </label>
            </div>
          </div>
          
          <button class="glass-button" (click)="submitQuiz()" [disabled]="!canSubmitQuiz()">Submit Quiz</button>
          
          <div *ngIf="quizResult()" class="quiz-result" [class.passed]="quizResult()?.passed">
            <p>{{ quizResult()?.passed ? 'Great job! You passed.' : 'Keep trying! Review the material.' }}</p>
            <p>Score: {{ quizResult()?.score }} / {{ quizResult()?.total }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .learning-dashboard {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .spinner {
      border: 4px solid rgba(255,255,255,0.1);
      border-top: 4px solid #fff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 1rem auto;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .modules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
    .module-card {
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .module-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0,0,0,0.2);
      border-color: rgba(255,255,255,0.4);
    }
    .back-btn { margin-bottom: 1.5rem; }
    .module-content { line-height: 1.6; font-size: 1.1rem; }
    .quiz-section {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid var(--glass-border);
    }
    .question { margin-bottom: 1.5rem; }
    .options { display: flex; flex-direction: column; gap: 0.5rem; }
    .option-label {
      background: rgba(255,255,255,0.05);
      padding: 0.75rem;
      border-radius: 0.5rem;
      cursor: pointer;
    }
    .option-label:hover { background: rgba(255,255,255,0.1); }
    .quiz-result {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      background: rgba(239, 68, 68, 0.2); /* Red for fail */
    }
    .quiz-result.passed { background: rgba(34, 197, 94, 0.2); /* Green for pass */ }
  `]
})
export class LearningComponent {
  private http = inject(HttpClient);
  
  topic = signal('');
  difficulty = signal('beginner');
  loading = signal(false);
  modules = signal<any[]>([]);
  
  activeModuleId = signal<string | null>(null);
  activeModule = signal<any | null>(null);
  
  selectedAnswers = signal<Record<string, number>>({});
  quizResult = signal<any | null>(null);

  startLearning() {
    if (!this.topic()) return;
    this.loading.set(true);
    this.http.post(`${environment.apiBaseUrl}/v1/concepts`, {
      topic: this.topic(),
      difficulty: this.difficulty()
    }).subscribe({
      next: (res: any) => {
        this.modules.set(res.modules);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  openModule(id: string) {
    this.activeModuleId.set(id);
    this.http.get(`${environment.apiBaseUrl}/v1/modules/${id}`).subscribe(res => {
      this.activeModule.set(res);
      this.selectedAnswers.set({});
      this.quizResult.set(null);
    });
  }

  closeModule() {
    this.activeModuleId.set(null);
    this.activeModule.set(null);
  }

  selectAnswer(qId: string, idx: number) {
    this.selectedAnswers.update(prev => ({ ...prev, [qId]: idx }));
  }

  canSubmitQuiz(): boolean {
    const questions = this.activeModule()?.quizQuestions || [];
    return questions.length > 0 && questions.every((q: any) => this.selectedAnswers()[q.id] !== undefined);
  }

  submitQuiz() {
    const answers = Object.entries(this.selectedAnswers()).map(([questionId, selectedIndex]) => ({
      questionId, selectedIndex
    }));
    
    this.http.post(`${environment.apiBaseUrl}/v1/quiz/evaluate`, {
      moduleId: this.activeModuleId(),
      answers
    }).subscribe(res => {
      this.quizResult.set(res);
    });
  }
}
