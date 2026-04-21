export default function ChatAI() {
  return (
    <div className="flex items-start space-x-3">

      <div className="w-8 h-8 bg-primary rounded-full"></div>

      <div className="bg-white p-6 rounded-xl max-w-xl shadow-sm">

        <h3 className="font-headline text-lg mb-2">
          Recomendación académica
        </h3>

        <p className="text-sm text-gray-600">
          Para mejorar tu redacción académica, es importante estructurar tus ideas con claridad,
          utilizar fuentes confiables y mantener un tono formal. También se recomienda revisar
          la coherencia y cohesión de los párrafos.
        </p>

      </div>

    </div>
  );
}