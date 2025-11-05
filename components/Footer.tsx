
import React from 'react';

export const Footer: React.FC = () => {
    // Note: A real API key would be needed for a production environment and should be handled securely.
    const googleMapsApiKey = "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao";
    const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=Govt+Model+Engineering+College,+Kochi`;

    return (
        <footer className="mt-12 text-center text-light-text-alt dark:text-dark-text-alt text-sm">
            <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden border border-light-border dark:border-dark-border mb-4">
                <iframe
                    className="w-full h-full"
                    src={mapSrc}
                    allowFullScreen
                    loading="lazy"
                    title="Location of Model Engineering College, Kochi"
                ></iframe>
            </div>
            <p>&copy; {new Date().getFullYear()} Abhin Krishna</p>
        </footer>
    );
};
