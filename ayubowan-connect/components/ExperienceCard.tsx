import React from 'react';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import '@/styles/components/ExperienceCard.css';

interface ExperienceCardProps {
  title: string;
  price: number;
  location: string;
  rating: number;
  imageUrl: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  price,
  location,
  rating,
  imageUrl,
}) => {
  return (
    <div className="experience-card">
      <div className="card-image-container">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="card-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="card-details">
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          <div className="card-rating">
            <Star size={14} className="star-icon" />
            <span>{rating}</span>
          </div>
        </div>
        
        <div className="card-location">
          <MapPin size={16} className="location-icon" />
          <span>{location}</span>
        </div>

        <div className="card-footer">
          <div className="card-price">
            LKR {price} <span>/ person</span>
          </div>
          <button className="view-details-btn">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
