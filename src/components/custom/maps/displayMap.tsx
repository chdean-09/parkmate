import React from "react";

interface GoogleMapData {
  location: string;
  city: string;
  parkingSpotName: string;
}

interface DisplayMapDetailsProps {
  mapData: GoogleMapData[];
  parkingSlot: number;
  className?: string;
}

const DisplayMapDetails = ({
  mapData,
  parkingSlot,
  className = "w-full h-[477px] md:w-3/4 md:h-[600px] lg:w-[900px]",
}: DisplayMapDetailsProps) => {
  return (
    <>
      {mapData.map((data: GoogleMapData) => (
        <div
          key={data.location}
          className={`border ${className} flex flex-col`}
        >
          <div className="flex-grow bg-amber-50">Maps Here</div>
          <div className="flex-shrink-0 bg-zinc-300 p-4">
            <p className="text-sm">{data?.parkingSpotName}</p>
            <div className="text-lg font-semibold">{`Availability: ${parkingSlot} spots`}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DisplayMapDetails;

/* <div className="w-full h-[432px] border flex flex-col">
  <div className="flex-grow bg-amber-50">Maps Here</div>
  <div className="flex-shrink-0 bg-zinc-300 p-4">
    <p className="text-sm">{mapData?.parkingSpotName}</p>
    <div className="text-lg font-semibold">{`Availability: ${parkingSlot} spots`}</div>
  </div>
</div>; */
