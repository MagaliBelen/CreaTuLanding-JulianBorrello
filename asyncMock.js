const products = [
  // Bijou
  {
    id: 1,
    title: 'Collar con corazones',
    price: '5500',
    category: 'bijou',
    description: 'Cadena corta con dije de corazones con strass y cierre de mosquetón.',
    image: '/collar_corazones.webp',
  },
  {
    id: 2,
    title: 'Set de anillos',
    price: '8800',
    category: 'bijou',
    description: 'Set por 20 anillos de diferentes formas y texturas',
    image: '/set_anillos.webp',
  },
  {
    id: 3,
    title: 'Set de aros con strass',
    price: '7500',
    category: 'bijou',
    description: 'Set de 3 aros con distintos pasantes en margaritas, frutas y strass, con cierre de tope a presión.',
    image: '/set_aros.webp',
  },
  {
    id: 4,
    title: 'Pulsera mariposas',
    price: '3200',
    category: 'bijou',
    description: 'Pulsera flexible de cadena premium con dijes de mariposas y strass, con cierre de mosquetón.',
    image: '/pulsera_mariposas.webp',
  },
  {
    id: 5,
    title: 'Collar cereza',
    price: '4200',
    category: 'bijou',
    description: 'Collar corto con arandela y dije de cereza esmaltado',
    image: '/collar_cereza.webp',
  },

  // Maquillaje
  {
    id: 6,
    title: 'Labial mate rojo',
    price: '2500',
    category: 'maquillaje',
    description: 'Labial en barra cremoso de acabado demi matte.',
    image: '/labial.webp',
  },
  {
    id: 7,
    title: 'Delineador con esfumino',
    price: '3500',
    category: 'maquillaje',
    description: 'Delineador negro de ojos con esfumino.',
    image: '/delineador.webp',
  },
  {
    id: 8,
    title: 'Máscara de pestañas "midnight crush"',
    price: '4000',
    category: 'maquillaje',
    description: 'Máscara de pestañas con efecto extra dark.',
    image: '/mascara.webp',
  },
  {
    id: 9,
    title: 'Esmalte rosa',
    price: '2000',
    category: 'maquillaje',
    description: 'Esmalte para uñas de efecto cremoso',
    image: '/esmalte_rosa.webp',
  },
  {
    id: 10,
    title: 'Sombras glitter',
    price: '1900',
    category: 'maquillaje',
    description: 'Paleta de sombras en crema con brillos',
    image: '/sombras.webp',
  },

  // Accesorios de pelo
  {
    id: 11,
    title: 'Set de broches',
    price: '6300',
    category: 'accesorios',
    description: 'Set que incluye 4 minibroches y 2 broches clasicos en mix de acabados',
    image: '/set_broches.webp',
  },
  {
    id: 12,
    title: 'Hebilla corazones',
    price: '1200',
    category: 'accesorios',
    description: 'Hebilla francesa con aplique de corazones en acrílico',
    image: '/hebilla_corazones.webp',
  },
  {
    id: 13,
    title: 'Hebillas con perlas',
    price: '1100',
    category: 'accesorios',
    description: 'Hebilla francesa con perlas',
    image: '/hebilla_perlas.webp',
  },
  {
    id: 14,
    title: 'Vincha puffy',
    price: '2800',
    category: 'accesorios',
    description: 'Vincha negra rígida puffy',
    image: '/vincha.webp',
  },
  {
    id: 15,
    title: 'Set de scrunchies metalizados',
    price: '3400',
    category: 'accesorios',
    description: 'Set de 3 scrunchies con brillos metálicos',
    image: '/scrunchies.webp',
  },
];

  
  export const getProducts = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 2000);
    });
  };
  
  export const getProduct = (id) => {
    return products.find((prod) => prod.id == id);
  };
  
  export const getCategory = (category) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.filter((product) => product.category === category));
        //va a retornar un array de prods que cumplan con esa condicion
      }, 1000);
    });
  };
  