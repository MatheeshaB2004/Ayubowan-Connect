"use client";

import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, StandaloneSearchBox } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 7.8731,
    lng: 80.7718
};

interface LocationPickerProps {
    onLocationSelect: (lat: number, lng: number) => void;
    initialLocation?: { lat: number; lng: number };
}

export default function LocationPicker({ onLocationSelect, initialLocation }: LocationPickerProps) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries,
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(
        initialLocation ? { lat: initialLocation.lat, lng: initialLocation.lng } : null
    );
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

    const center = position || defaultCenter;

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    const onSearchBoxLoad = (ref: google.maps.places.SearchBox) => {
        setSearchBox(ref);
    };

    const onPlacesChanged = () => {
        if (searchBox) {
            const places = searchBox.getPlaces();
            if (places && places.length > 0) {
                const place = places[0];
                if (place.geometry && place.geometry.location) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    const newPos = { lat, lng };
                    setPosition(newPos);
                    onLocationSelect(lat, lng);
                    map?.panTo(newPos);
                    map?.setZoom(15);
                }
            }
        }
    };

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setPosition({ lat, lng });
            onLocationSelect(lat, lng);
        }
    };

    const handleUseMyLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const newPos = { lat: latitude, lng: longitude };
                    setPosition(newPos);
                    onLocationSelect(latitude, longitude);
                    map?.panTo(newPos);
                    map?.setZoom(15);
                },
                (err) => {
                    console.error(err);
                    alert("Could not get your location. Please ensure you have granted permission.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser");
        }
    };

    if (loadError) return <div>Error loading maps. Check API Key.</div>;
    if (!isLoaded) return (
        <div className="w-full">
            <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-lg border border-gray-300 flex items-center justify-center">
                <p className="text-gray-500 font-medium">Loading Google Maps...</p>
            </div>
        </div>
    );

    return (
        <div className="location-picker-wrapper w-full">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <button
                    type="button"
                    onClick={handleUseMyLocation}
                    className="bg-gray-100 text-gray-700 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 whitespace-nowrap flex items-center gap-2 transition-colors focus:ring-2 focus:ring-teal-500"
                >
                    <span>📍</span> Use My Location
                </button>
                <div className="flex-1 max-w-full">
                    {/* Need div wrapper for SearchBox to work properly */}
                    <StandaloneSearchBox
                        onLoad={onSearchBoxLoad}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <input
                            type="text"
                            placeholder="Search for a place (e.g. Colombo, Galle)"
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500"
                        />
                    </StandaloneSearchBox>
                </div>
            </div>

            <div className="h-[300px] w-full rounded-lg overflow-hidden border border-gray-300 relative z-0">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={position ? 15 : 7}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onClick={handleMapClick}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                >
                    {position && (
                        <Marker position={position} />
                    )}
                </GoogleMap>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center italic">Tip: You can search or click anywhere on the map to fine-tune your exact pin location.</p>
        </div>
    );
}
