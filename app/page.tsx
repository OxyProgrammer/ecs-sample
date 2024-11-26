export const dynamic = 'force-dynamic';

type ColorChoice = 'blue' | 'green' | 'brown' | 'orange' | 'black';

export default function Home() {
  const colors: Record<ColorChoice, string> = {
    blue: '#007BFF',
    green: '#28A745',
    brown: '#8B4513',
    orange: '#FF5722',
    black: '#000000',
  };

  const envColorChoice = process.env.DEPLOYMENT_COLOR as ColorChoice;

  console.log(
    `Color Choice from environment variable is ${
      process.env.DEPLOYMENT_COLOR || 'NOT DEFINED OR FALSY'
    }`
  );

  const headingColor: string =
    envColorChoice && colors[envColorChoice] ? colors[envColorChoice] : colors.black;

  const message: string = envColorChoice
    ? `This is ${envColorChoice} deployment`
    : 'Could not load color! Please supply env variable.';

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <h1 className='text-3xl' style={{ color: headingColor }}>
          {message}
        </h1>
      </main>
    </div>
  );
}
