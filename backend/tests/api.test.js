const assert = require('assert');

async function runTests() {
  try {
    const res = await fetch('http://localhost:3000/api/v1/health');
    const json = await res.json();
    assert.strictEqual(json.status, 'ok');
    console.log('Health check passed');

    const res2 = await fetch('http://localhost:3000/api/v1/concepts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: 'React', difficulty: 'beginner' })
    });
    const json2 = await res2.json();
    assert.strictEqual(json2.topic, 'React');
    assert.strictEqual(json2.modules.length, 2);
    console.log('Generate modules passed');
    console.log('All backend tests passed!');
  } catch (err) {
    console.error('Test failed', err);
    process.exit(1);
  }
}

runTests();
