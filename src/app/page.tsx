
import Image from 'next/image';
import Layout from './components/layout';
import ProductCards from './components/ProductCards';

export default function Home() {
    return (
        <Layout>
            <div className='flex flex-col h-screen bg-seasalt pt-20 w-full'>
                <section className=" flex-grow flex justify-center items-center relative w-full h-60">
                    <Image
                        src="/banner.png"
                        alt="Banner Image"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                    <div className="absolute text-white text-center z-10"></div>
                </section>
                <section className="flex-grow flex justify-center items-center">
                    <div className="text-white text-center w-full">
                        <ProductCards />
                    </div>
                </section>
                <section className="bg-green-500 flex-grow flex justify-center items-center">
                    <div className="text-white text-center">Best Rated Items: Highest score reviews - Blad Andrew</div>
                </section>
            </div>
        </Layout>
    );
}
