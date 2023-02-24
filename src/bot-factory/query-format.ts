export interface query {
    flow_type: string;
    work: {
      id: string;
      label: string;
      type: string;
    };
    seed: {
      url: string;
    };
  }