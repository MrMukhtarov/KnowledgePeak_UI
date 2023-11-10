import React, { useEffect } from "react";
import Map from "../../components/ContactComponents/Map/Index";
import Information from '../../components/ContactComponents/Information/Index'
import Form from '../../components/ContactComponents/Form/Index'

const Index = () => {
  useEffect(() => {
    document.title = "Knoweldge Peak | Contact";
  });

  return (
    <div>
      <Map />
      <Information/>
      <Form/>
    </div>
  );
};

export default Index;
