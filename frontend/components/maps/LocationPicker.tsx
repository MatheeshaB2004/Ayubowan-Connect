"use client";

import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, StandaloneSearchBox } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
const googleMapsEnabled = process.env.NEXT_PUBLIC_ENABLE_GOOGLE_MAPS === 'true' && Boolean(googleMapsApiKey);

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

interface ManualLocationFallbackProps {
    onLocationSelect: (lat: number, lng: number) => void;
    initialLocation?: { lat: number; lng: number };
}

function ManualLocationFallback({ onLocationSelect, initialLocation }: ManualLocationFallbackProps) {
    const [latitude, setLatitude] = useState(initialLocation?.lat?.toString() || '');
    const [longitude, setLongitude] = useState(initialLocation?.lng?.toString() || '');
    const [locationError, setLocationError] = useState<string | null>(null);

    const syncLocation = useCallback((nextLat: string, nextLng: string) => {
        const parsedLat = Number(nextLat);
        const parsedLng = Number(nextLng);

        if (!nextLat || !nextLng) {
            setLocationError(null);
            return;
        }

        const isValidLat = Number.isFinite(parsedLat) && parsedLat >= -90 && parsedLat <= 90;
        const isValidLng = Number.isFinite(parsedLng) && parsedLng >= -180 && parsedLng <= 180;

        if (!isValidLat || !isValidLng) {
            setLocationError('Enter valid latitude and longitude values.');
            return;
        }

        setLocationError(null);
        onLocationSelect(parsedLat, parsedLng);
    }, [onLocationSelect]);

    const handleUseMyLocation = () => {
        if (!("geolocation" in navigator)) {
            setLocationError('Geolocation is not supported by your browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const nextLat = pos.coords.latitude.toFixed(6);
                const nextLng = pos.coords.longitude.toFixed(6);

                setLatitude(nextLat);
                setLongitude(nextLng);
                setLocationError(null);
                onLocationSelect(pos.coords.latitude, pos.coords.longitude);
            },
            () => {
                setLocationError('Could not get your current location.');
            }
        );
    };

    return (
        <div className="w-full rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold text-amber-900">Interactive map unavailable</p>
                    <p className="text-sm text-amber-800">Enter coordinates manually or use your current location.</p>
                </div>
                <button
                    type="button"
                    onClick={handleUseMyLocation}
                    className="rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-900 transition-colors hover:bg-amber-100"
                >
                    Use My Location
                </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="manual-latitude">Latitude</label>
                    <input
                        id="manual-latitude"
                        type="number"
                        inputMode="decimal"
                        step="any"
                        value={latitude}
                        onChange={(e) => {
                            const nextLat = e.target.value;
                            setLatitude(nextLat);
                            syncLocation(nextLat, longitude);
                        }}
                        placeholder="e.g. 6.9271"
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="manual-longitude">Longitude</label>
                    <input
                        id="manual-longitude"
                        type="number"
                        inputMode="decimal"
                        step="any"
                        value={longitude}
                        onChange={(e) => {
                            const nextLng = e.target.value;
                            setLongitude(nextLng);
                            syncLocation(latitude, nextLng);
                        }}
                        placeholder="e.g. 79.8612"
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                </div>
            </div>

            {locationError ? (
                <p className="mt-3 text-sm text-red-600">{locationError}</p>
            ) : (
                <p className="mt-3 text-xs text-gray-600">Google Maps is disabled until NEXT_PUBLIC_ENABLE_GOOGLE_MAPS is set to true with a working API key.</p>
            )}
        </div>
    );
}

function GoogleLocationPicker({ onLocationSelect, initialLocation }: LocationPickerProps) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey,
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

export default function LocationPicker(props: LocationPickerProps) {
    if (!googleMapsEnabled) {
        return <ManualLocationFallback {...props} />;
    }

    return <GoogleLocationPicker {...props} />;
}
