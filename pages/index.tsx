import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div
      className={
        'w-screen h-screen bg-black flex flex-col items-center gap-y-20 justify-center p-40'
      }
    >
      <h1 className={'text-white text-8xl'}>Hello TailwindCSS + Next.js</h1>
      <span className={'text-white h-full'}>

        <code className={'flex flex-col gap-y-2 h-full items-center'}>
          <pre className={'bg-gray-600 p-2'}>yarn prettier-check</pre>
          <pre className={'bg-gray-600 p-2'}>yarn prettier-write</pre>

          <span className={'bg-gray-600 p-2 flex flex-col'}>
            {`{`}{' '}
            <span className={'w-full'}>&quot;semi&quot;: true,</span>
            <span className={'w-full'}>&quot;singleQuote&quot;: true,</span>
            <span className={'w-full'}>&quot;trailingComma&quot;: &quot;all&quot;,</span>
            <span className={'w-full'}>&quot;printWidth&quot;: 80</span>
            {`}`}
          </span>

        </code>

      </span>
    </div>
  );
};
export default Home;
