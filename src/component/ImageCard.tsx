interface ImageCardProps {
  image: any;
}

export default function ImageCard({ image }: ImageCardProps) {
  return (
    <div className="border rounded overflow-hidden shadow-md">
      <img
        src={image.urls.small}
        alt={image.alt_description || "Image"}
        className="w-full h-auto"
      />
      <div className="p-2">
        <p className="text-sm font-semibold">{image.user.name}</p>
      </div>
    </div>
  );
}
