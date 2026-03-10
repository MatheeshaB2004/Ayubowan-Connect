"use client";

import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

interface VendorLocationMapProps {
    latitude: number;
    longitude: number;
    businessName?: string;
}

export default function VendorLocationMap({ latitude, longitude, businessName }: VendorLocationMapProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [infoWindowOpen, setInfoWindowOpen] = useState(true);

    const position = { lat: latitude, lng: longitude };

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    if (!latitude || !longitude) {
        return (
            <div className="h-[250px] w-full bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-500">
                Location not provided
            </div>
        );
    }

    if (!isLoaded) return (
        <div className="h-[250px] w-full bg-gray-100 animate-pulse rounded-lg border border-gray-200 flex items-center justify-center">
            <p className="text-gray-500 font-medium">Loading Google Map...</p>
        </div>
    );

    return (
        <div className="h-[250px] w-full rounded-lg overflow-hidden border border-gray-200 relative z-0">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={position}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >
                <Marker
                    position={position}
                    onClick={() => {
                        setInfoWindowOpen(true);
                        window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
                    }}
                >
                    {businessName && infoWindowOpen && (
                        <InfoWindow
                            position={position}
                            onCloseClick={() => setInfoWindowOpen(false)}
                        >
                            <div className="font-medium text-gray-800 p-1 min-w-[80px] text-center">{businessName}</div>
                        </InfoWindow>
                    )}
                </Marker>
            </GoogleMap>
        </div>
    );
}
