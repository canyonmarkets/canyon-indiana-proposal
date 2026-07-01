import Deck, { type SceneDef } from '@/app/components/deck/Deck';
import BootScene from '@/app/components/scenes/BootScene';
import TitleScene from '@/app/components/scenes/TitleScene';
import StakesScene from '@/app/components/scenes/StakesScene';
import OpportunityScene from '@/app/components/scenes/OpportunityScene';
import MarketGalleryScene from '@/app/components/scenes/MarketGalleryScene';
import GymCoolerScene from '@/app/components/scenes/GymCoolerScene';
import PillarScene from '@/app/components/scenes/PillarScene';
import PantryScene from '@/app/components/scenes/PantryScene';
import BootsScene from '@/app/components/scenes/BootsScene';
import FootprintScene from '@/app/components/scenes/FootprintScene';
import StackScene from '@/app/components/scenes/StackScene';
import SupplyScene from '@/app/components/scenes/SupplyScene';
import SummaryScene from '@/app/components/scenes/SummaryScene';
import OperatorsScene from '@/app/components/scenes/OperatorsScene';
import EngageScene from '@/app/components/scenes/EngageScene';
import { PILLAR_SPECS } from '@/app/data/pillars';

const [, amenities, field, foodtrucks] = PILLAR_SPECS;

const SCENES: SceneDef[] = [
  { id: 'init', label: 'Init', element: <BootScene />, dwell: 5200 },
  { id: 'brief', label: 'Brief', element: <TitleScene />, dwell: 6500 },
  { id: 'stakes', label: 'Stakes', element: <StakesScene />, dwell: 8500 },
  { id: 'opportunity', label: 'Opportunity', element: <OpportunityScene />, dwell: 11000 },
  { id: 'market', label: 'Micro Market', element: <MarketGalleryScene />, dwell: 14000 },
  { id: 'pantry', label: 'Pantry', element: <PantryScene />, dwell: 14000 },
  { id: 'amenities', label: 'Amenities', element: <PillarScene spec={amenities} />, dwell: 10000 },
  { id: 'gymcooler', label: 'Gym Cooler', element: <GymCoolerScene />, dwell: 11000 },
  { id: 'field', label: 'Field', element: <PillarScene spec={field} />, dwell: 10000 },
  { id: 'foodtrucks', label: 'Food Trucks', element: <PillarScene spec={foodtrucks} />, dwell: 10000 },
  { id: 'boots', label: 'Boots', element: <BootsScene />, dwell: 7500 },
  { id: 'footprint', label: 'Site', element: <FootprintScene />, dwell: 13000 },
  { id: 'stack', label: 'Stack', element: <StackScene />, dwell: 13000 },
  { id: 'supply', label: 'Supply', element: <SupplyScene />, dwell: 8500 },
  { id: 'summary', label: 'Summary', element: <SummaryScene />, dwell: 9500 },
  { id: 'operators', label: 'Operators', element: <OperatorsScene />, dwell: 11000 },
  { id: 'engage', label: 'Engage', element: <EngageScene /> },
];

export default function Home() {
  return <Deck scenes={SCENES} />;
}
