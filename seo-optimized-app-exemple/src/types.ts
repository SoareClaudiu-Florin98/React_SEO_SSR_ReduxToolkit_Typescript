import { LoaderFunctionArgs } from 'react-router-dom';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

export type LoaderFunctionParams = LoaderFunctionArgs & ToolkitStore;