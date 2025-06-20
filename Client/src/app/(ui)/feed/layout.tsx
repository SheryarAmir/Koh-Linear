

import { ReactNode } from "react";

type SubLayoutProps = {
  title?: string;
  children: ReactNode;
};

const SubLayout = ({children }: SubLayoutProps) => {
  return (
    <div >
     
        {children}
      
    </div>
  );
};

export default SubLayout;
