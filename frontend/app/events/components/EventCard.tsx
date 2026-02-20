type EventCardProps = {
    title: string;
};

export default function EventCard({ title }: EventCardProps) {
    return (
        <div className = "border p-4 rounded">
            <h2 className = "font-semibold">{title}</h2>
        </div>
    );
}