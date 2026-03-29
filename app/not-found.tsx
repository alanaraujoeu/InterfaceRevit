import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Página não encontrada</h2>
      <p className="mt-2">Não conseguimos encontrar a página que você está procurando.</p>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Voltar para o início
      </Link>
    </div>
  );
}
