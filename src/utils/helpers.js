// Image mapping - maps imageKey to actual image paths
// Images are stored in public/images/ for easy access
const imageMap = {
  'tractor1': '/images/tractors/tractor1.png',
  'tractor2': '/images/tractors/tractor2.png',
  'tractor3': '/images/tractors/tractor3.png',
  'tractor4': '/images/tractors/tractor4.png',
  'tractor5': '/images/tractors/tractor5.png',
  'john_deere_5310': '/images/tractors/john_deere_5310.png',
  'mahindra_575_di': '/images/tractors/mahindra_575_di.png',
  'swaraj_744_fe': '/images/tractors/swaraj_744_fe.png',
  'rotavator': '/images/machinery/rotavator.png',
  'cultivator': '/images/machinery/cultivator.png',
  'plough': '/images/machinery/plough.png',
  'seed-drill': '/images/machinery/seed-drill.png',
  'trailer': '/images/machinery/trailer.png',
  'laser_leveler': '/images/machinery/laser_leveler.png',
  'boom_sprayer': '/images/machinery/boom_sprayer.png',
};

export function getImageUrl(imageKey) {
  return imageMap[imageKey] || '/images/tractors/tractor1.png';
}

export function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}
