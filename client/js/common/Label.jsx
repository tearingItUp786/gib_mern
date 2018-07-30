// @flow

import React from 'react';

const Label = (props: React.Element<'label'>) => {
  const { htmlFor, ...otherProps } = props;

  return <label htmlFor={htmlFor} {...otherProps} />;
};

export default Label;
