const text = "Hola Mundo";

test('Test 0: Jest funcionando correctamente', ()=>{
    expect(text).toMatch(/Mundo/);
})
