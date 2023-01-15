import cluster from 'cluster';
import { cpus } from 'os';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const { server } = await import('./index.js');
  server.listen();

  console.log(`Worker ${process.pid} started`);
}
