import { useState } from "react";
import axios from "axios";


interface Flag {
    png: string;
    svg: string;
    alt: string;
}

interface CountryFlag {
    flags: Flag[];
}

function Flags() {
    const [flags, setFlags] = useState<Flag[]>([]);

    const getFleg = () => {
        axios
            .get<CountryFlag>("http://localhost:3000/api/flags")
            .then((res) => {
                return res.data;
            }).then((res) => {
                setFlags(res.flags ?? []);
            })
            .catch((rej) => {
                console.log(rej);
            });
    }

    // useEffect(() => {
    //     getFleg()
    // }, []);

    return (
        <div className="p-2 flex flex-col  gap-4">
            <button className="cursor-pointer flex m-auto p-auto border bg-blue-300 " onClick={getFleg}>Click</button>
            <div className="grid grid-flow-row-dense grid-cols-3 gap-4">
                {
                    flags.map((flagImage, index) => (
                        <img onClick={() => {
                            console.log(flags)
                            const res = flags.filter((item) => item != flagImage)
                            console.log(res)
                            setFlags(res)
                        }} key={index} src={flagImage.png} alt={flagImage.alt} />

                    ))
                }
            </div>

        </div>
    );
}

export default Flags;
