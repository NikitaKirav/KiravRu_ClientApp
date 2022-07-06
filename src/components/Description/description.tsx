import React, { Component } from "react";
import { HomeDescription, BlogDescription, ProjectsDescription } from './text-description';
import { Route, Routes, useLocation } from 'react-router-dom';

interface DescriptionsType {
  [key: string]: JSX.Element
}

const descriptions: DescriptionsType = {
  '/': <HomeDescription />,
  '/notes': <BlogDescription />,
  '/works': <ProjectsDescription />
};

export const Description = () => {

  const {pathname} = useLocation();

  return descriptions[pathname];
}
