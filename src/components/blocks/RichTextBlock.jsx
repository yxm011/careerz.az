import './Block.css';

function RichTextBlock({ data }) {
  return (
    <div className="block rich-text-block">
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
}

export default RichTextBlock;
