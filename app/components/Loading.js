import React from 'react';

const Loading = ({ text = 'Loading' }) => {
  const [content, setContent] = React.useState(text);
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setContent((content) => {
        return content === `${text}...` ? text : `${content}.`;
      });
    }, 300);
    return () => window.clearInterval(id);
  }, [text]);

  return <p className='loading'>{content}</p>;
};
export default Loading;
