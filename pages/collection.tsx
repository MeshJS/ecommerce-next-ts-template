const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "/product",
    price: "$48",
    imageSrc:
      "/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "/product",
    price: "$35",
    imageSrc:
      "/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "/product",
    price: "$89",
    imageSrc:
      "/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "/product",
    price: "$35",
    imageSrc:
      "/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 5,
    name: "Focus Card Tray",
    href: "/product",
    price: "$64",
    imageSrc:
      "/category-page-04-image-card-05.jpg",
    imageAlt: "Paper card sitting upright in walnut card holder on desk.",
  },
  {
    id: 6,
    name: "Focus Multi-Pack",
    href: "/product",
    price: "$39",
    imageSrc:
      "/category-page-04-image-card-06.jpg",
    imageAlt: "Stack of 3 small drab green cardboard paper card refill boxes with white text.",
  },
  {
    id: 7,
    name: "Brass Scissors",
    href: "/product",
    price: "$50",
    imageSrc:
      "/category-page-04-image-card-07.jpg",
    imageAlt: "Brass scissors with geometric design, black steel finger holes, and included upright brass stand.",
  },
  {
    id: 8,
    name: "Focus Carry Pouch",
    href: "/product",
    price: "$32",
    imageSrc:
      "/category-page-04-image-card-08.jpg",
    imageAlt: "Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.",
  },
];

export default function Collection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
