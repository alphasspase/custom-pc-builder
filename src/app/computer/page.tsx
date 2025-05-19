import HeroHighlightSection from '../../components/global/HeroHighlightSection';
import { DemandAssessments } from '@/services/demand_assessment/demand_assessment';
import WorkTypeSelection from './_components/WorkTypeSelection';

const computerPage = async () => {
  const question = await DemandAssessments.getFirstQuestion();

  return (
    <div>
      <HeroHighlightSection
        title="Demand Assessment Questions"
        highlight="Assessment"
        description={`Unleash the power of our intelligent configurator and craft your perfect PC. Answer a few simple questions, and we’ll tailor a build with the best components to match your needs—whether you’re gaming, streaming, or multitasking.`}
      />

      <WorkTypeSelection question={question} />
    </div>
  );
};

export default computerPage;
