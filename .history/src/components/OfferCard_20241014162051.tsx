import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface OfferCardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  link: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ title, description, imageUrl, price, link }) => {
  return (
    <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <Image src={imageUrl} alt={title} width={300} height={200} className="w-full h-48 object-cover" />
      <div className="p-6">
        <Link href={link} className="group">
          <h3 className="text-xl font-bold mb-2 text-white group-hover:underline transition-all duration-300">
            {title}
          </h3>
        </Link>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-white">{price}</span>
          <Link href={link} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
