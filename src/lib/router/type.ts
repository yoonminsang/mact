/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '../mact';

interface ClassContructor {
  new (props: any): Component;
}

export interface IRoute {
  path: string;
  component: ClassContructor;
  props?: Record<string, any>;
}
