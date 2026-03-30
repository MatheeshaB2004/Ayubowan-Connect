"use client";

import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
const googleMapsEnabled = process.env.NEXT_PUBLIC_ENABLE_GOOGLE_MAPS === 'true' && Boolean(googleMapsApiKey);

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

interface VendorLocationMapProps {
    latitude: number;
    longitude: number;
    businessName?: string;
}

function MapFallback({ latitude, longitude, businessName }: VendorLocationMapProps) {
    return (
        <div className="flex h-[250px] w-full flex-col justify-between rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950">
            <div>
                <p className="text-sm font-semibold">Map preview unavailable</p>
                <p className="mt-1 text-sm text-amber-900">Google Maps is disabled or not configured for this environment.</p>
            </div>

            <div className="space-y-1 text-sm">
                {businessName ? <p className="font-medium">{businessName}</p> : null}
                <p>Latitude: {latitude.toFixed(6)}</p>
                <p>Longitude: {longitude.toFixed(6)}</p>
            </div>

            <a
                href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-900 transition-colors hover:bg-amber-100"
            >
                Open in Google Maps
            </a>
        </div>
    );
}

function GoogleVendorLocationMap({ latitude, longitude, businessName }: VendorLocationMapProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey,
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

export default function VendorLocationMap(props: VendorLocationMapProps) {
    if (!props.latitude || !props.longitude) {
        return (
            <div className="h-[250px] w-full bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-500">
                Location not provided
            </div>
        );
    }

    if (!googleMapsEnabled) {
        return <MapFallback {...props} />;
    }

    return <GoogleVendorLocationMap {...props} />;
}
