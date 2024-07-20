
import Image from 'next/image';
import Layout from './components/layout';

export default function Home() {
    return (
        <Layout>
            <div className='flex flex-col h-screen bg-seasalt p-5 pt-20'>
                <section className=" flex-grow flex justify-center items-center relative w-full h-60">
                    <Image
                        src="/banner.png"
                        alt="Banner Image"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                    <div className="absolute text-white text-center z-10">Banner: Image of product with button - Siarhei Herman</div>
                </section>
                <section className="bg-blue-500 flex-grow flex justify-center items-center">
                    <div className="text-white text-center">Section: Cards for different items with plus icon - James Green</div>
                </section>
                <section className="bg-green-500 flex-grow flex justify-center items-center">
                    <div className="text-white text-center">Best Rated Items: Highest score reviews - Blad Andrew</div>
                </section>
            </div>
        </Layout>
    );
}
