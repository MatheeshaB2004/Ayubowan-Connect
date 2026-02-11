import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import './ExperienceCard.css';

interface ExperienceCardProps {
  id: number;
  title: string;
  price: number;
  location: string;
  rating: number;
  imageUrl?: string | null;
  type?: 'experience' | 'product';
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  id,
  title,
  price,
  location,
  rating,
  imageUrl,
  type = 'experience',
}) => {
  const detailLink = type === 'product' 
    ? `/marketplace/products/${id}` 
    : `/marketplace/experiences/${id}`;
  const safeImageUrl = imageUrl ?? '/assets/photos/B4.webp';

  return (
    <Link href={detailLink} className="experience-card block group">
      <div className="card-image-container">
        <Image
          src={safeImageUrl}
          alt={title}
          fill
          className="card-image transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="card-details">
        <div className="card-header">
          <h3 className="card-title group-hover:text-lochinvar transition-colors">{title}</h3>
          <div className="card-rating">
            <Star size={14} className="star-icon" />
            <span>{rating > 0 ? rating.toFixed(1) : '0.0'}</span>
          </div>
        </div>
        
        <div className="card-location">
          <MapPin size={16} className="location-icon" />
          <span>{location}</span>
        </div>

        <div className="card-footer">
          <div className="card-price">
            LKR {price} <span>/ {type === 'product' ? 'item' : 'person'}</span>
          </div>
          <span className="view-details-btn text-center">View Details</span>
        </div>
      </div>
    </Link>
  );
};

export default ExperienceCard;
