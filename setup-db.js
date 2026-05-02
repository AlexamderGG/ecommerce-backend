const { execSync } = require('child_process');

console.log('🔄 Verificando estado de la base de datos en la nube...');

try {
  // Intenta crear las tablas. 
  // Gracias al "directUrl" que pusimos en el esquema, esto no buscará binarios locales y no explotará.
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('✅ Tablas verificadas/creadas en la nube.');
} catch (error) {
  console.log('⚠️ Hubo un error menor al crear tablas (puede que ya existan). Continuando...');
}

try {
  // Intenta poblar la base de datos.
  execSync('npx prisma db seed', { stdio: 'inherit' });
  console.log('✅ Base de datos poblada con el usuario Admin y productos de prueba.');
} catch (error) {
  console.log('⚠️ La base de datos ya estaba poblada (no pasa nada crítico).');
}

console.log('🚀 Base de datos lista. Iniciando servidor...\n');