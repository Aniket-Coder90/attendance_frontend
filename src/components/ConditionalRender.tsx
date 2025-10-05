import React from "react";

const ConditionalRender = ({
  children,
  condition,
  emptyNode,
}: {
  children?: React.ReactNode;
  emptyNode?: React.ReactNode;
  condition: boolean;
}) => {
  return condition ? children : emptyNode;
};

export default ConditionalRender;
