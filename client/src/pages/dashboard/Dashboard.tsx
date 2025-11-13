import { useEffect, useState } from "react";
import useServiceStore from "../../store/service.store";
import { axiosInstance } from "../../utils/axiosInstance";
import useUserStore from "../../store/user.store";

export default function Dashboard() {
  const { user } = useUserStore();
  const { createService } = useServiceStore();
  const [services, setServices] = useState([]);
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    location: "",
    category: "",
  });
  const [isAddForm, setIsAddForm] = useState(false);

  const fetchService = async () => {
    const result = await axiosInstance.get("/service/getServices");
    setServices(result.data.services || []);
  };

  useEffect(() => {
    const fetch = async () => {
      fetchService();
    };
    fetch();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const addService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createService(serviceData);
      await fetchService();
      setServiceData({ name: "", description: "", location: "", category: "" });
      setIsAddForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex relative">
      {user[0].role === "provider" && (
        <button
          className="border h-10 rounded-2xl py-1 px-2 m-2"
          onClick={() => setIsAddForm(!isAddForm)}
        >
          + Add Service
        </button>
      )}

      <div className="2/3">
        {services.length > 0 ? (
          <div>
            {services.map((service) => (
              <div
                key={service._id}
                className="card w-96 bg-base-100 card-sm shadow-sm"
              >
                <div className="card-body">
                  <h2 className="card-title">{service.name}</h2>
                  <p>{service.description}</p>
                  <div className="justify-end card-actions">
                    <button className="btn btn-primary">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No services yet.</p>
        )}
      </div>

      {isAddForm && (
        <div className="absolute left-0 top-0 w-full h-screen flex justify-center items-center bg-black/50">
          <form
            onSubmit={addService}
            className="flex flex-col relative bg-slate-300 p-4 rounded-lg shadow-md w-80"
          >
            <button
              className="absolute right-2 top-2 "
              onClick={() => setIsAddForm(!isAddForm)}
            >
              ❌
            </button>
            <h2 className="text-lg text-black font-semibold mb-2">
              Add Service
            </h2>
            <input
              type="text"
              placeholder="Name"
              className="input w-full mb-2"
              name="name"
              value={serviceData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Description"
              className="input w-full mb-2"
              name="description"
              value={serviceData.description}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Location"
              className="input w-full mb-2"
              name="location"
              value={serviceData.location}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Category"
              className="input w-full mb-2"
              name="category"
              value={serviceData.category}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary">
              Add Service
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
