declare module "react-image-annotation" {
  export interface IGeometry {
    type: string;
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  }
  export interface ISelector {
    TYPE: string;
    intersects: (
      { x, y }: { x: number; y: number },
      geometry: IGeometry,
      container: { width: number; height: number }
    ) => boolean;
    area: (
      geometry: IGeometry,
      container: { width: number; height: number }
    ) => number;
    methods: {
      onMouseUp?: (annotation: IAnnotation, e: any) => IAnnotation | {};
      onMouseDown?: (annotation: IAnnotation, e: any) => IAnnotation | {};
      onMouseMove?: (annotation: IAnnotation, e: any) => IAnnotation | {};
      onClick?: (annotation: IAnnotation, e: any) => IAnnotation | {};
    };
  }
  export interface IAnnotation {
    selection?: {
      mode: string;
      showEditor: boolean;
    };
    geometry: IGeometry;
    data: {
      text: string;
      id?: number;
    };
  }
  interface IAnnotationProps {
    src: string;
    alt?: string;
    innerRef?: (e: any) => any;
    onMouseUp?: (e: React.MouseEvent) => any;
    onMouseDown?: (e: React.MouseEvent) => any;
    onMouseMove?: (e: React.MouseEvent) => any;
    onClick?: (e: React.MouseEvent) => any;

    annotations: IAnnotation[];
    type?: string;
    selectors?: ISelector[];

    value: IAnnotation | {};
    onChange?: (e: any) => any;
    onSubmit?: (e: any) => any;

    activeAnnotationComparator?: (annotation: IAnnotation) => boolean;
    activeAnnotations?: IAnnotation[];

    disableAnnotation?: boolean;
    disableSelector?: boolean;
    renderSelector?: (
      { annotation, active }: { annotation: IAnnotation; active: boolean }
    ) => any;
    disableEditor?: boolean;
    renderEditor?: (
      {
        annotation,
        onChange,
        onSubmit
      }: {
        annotation: IAnnotation;
        onChange: (annotation: IAnnotation | {}) => any;
        onSubmit: (e?: any) => any;
      }
    ) => any;

    renderHighlight?: (
      { annotation, active }: { annotation: IAnnotation; active: boolean }
    ) => any;
    renderContent?: ({ annotation }: { annotation: IAnnotation }) => any;

    disableOverlay?: boolean;
    renderOverlay?: () => any;
    allowTouch: boolean;
  }

  class Annotation extends React.Component<IAnnotationProps, {}> {}
  export default Annotation;
}
