import RichTextBlock from './blocks/RichTextBlock';
import AssetBlock from './blocks/AssetBlock';
import TextInputBlock from './blocks/TextInputBlock';
import FileUploadBlock from './blocks/FileUploadBlock';
import LinkInputBlock from './blocks/LinkInputBlock';
import MultipleChoiceBlock from './blocks/MultipleChoiceBlock';
import VideoBlock from './blocks/VideoBlock';
import FillInBlanksBlock from './blocks/FillInBlanksBlock';
import OrderingBlock from './blocks/OrderingBlock';
import TrueFalseBlock from './blocks/TrueFalseBlock';
import DropdownBlock from './blocks/DropdownBlock';
import MatchingBlock from './blocks/MatchingBlock';
import CodeEditorBlock from './blocks/CodeEditorBlock';
import TeamOverviewBlock from './blocks/TeamOverviewBlock';
import ScenarioBriefBlock from './blocks/ScenarioBriefBlock';
import RoleOverviewBlock from './blocks/RoleOverviewBlock';
import TransitionBlock from './blocks/TransitionBlock';
import './BlockRenderer.css';

function BlockRenderer({ block, value, onChange }) {
  const renderBlock = () => {
    switch (block.type) {
      case 'richText':
        return <RichTextBlock data={block.data} />;
      case 'asset':
        return <AssetBlock data={block.data} />;
      case 'textInput':
        return <TextInputBlock data={block.data} value={value} onChange={onChange} />;
      case 'fileUpload':
        return <FileUploadBlock data={block.data} value={value} onChange={onChange} />;
      case 'linkInput':
        return <LinkInputBlock data={block.data} value={value} onChange={onChange} />;
      case 'multipleChoice':
        return <MultipleChoiceBlock data={block.data} value={value} onChange={onChange} />;
      case 'video':
        return <VideoBlock data={block.data} />;
      case 'fillInBlanks':
        return <FillInBlanksBlock data={block.data} value={value} onChange={onChange} />;
      case 'ordering':
        return <OrderingBlock data={block.data} value={value} onChange={onChange} />;
      case 'trueFalse':
        return <TrueFalseBlock data={block.data} value={value} onChange={onChange} />;
      case 'dropdown':
        return <DropdownBlock data={block.data} value={value} onChange={onChange} />;
      case 'matching':
        return <MatchingBlock data={block.data} value={value} onChange={onChange} />;
      case 'codeEditor':
        return <CodeEditorBlock data={block.data} value={value} onChange={onChange} />;
      case 'teamOverview':
        return <TeamOverviewBlock data={block.data} />;
      case 'scenarioBrief':
        return <ScenarioBriefBlock data={block.data} />;
      case 'roleOverview':
        return <RoleOverviewBlock data={block.data} />;
      case 'transition':
        return <TransitionBlock data={block.data} />;
      default:
        return <div className="block-error">Unknown block type: {block.type}</div>;
    }
  };

  return (
    <div className="block-wrapper">
      {renderBlock()}
    </div>
  );
}

export default BlockRenderer;
