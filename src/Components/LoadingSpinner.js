import React from "react";
import "./CSS/Loader.css";
import { Loader, Placeholder } from 'rsuite';

export default function LoadingSpinner() {
  return (
    <div>
    <Placeholder.Paragraph rows={8} />
    <Loader center content="loading" />
  </div>
  );
}