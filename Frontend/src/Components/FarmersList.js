import React, { useEffect, useState } from "react";
import { Table, Container, Button, Modal, Form } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import api from "../api";

export function FarmersList() {
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null); // For viewing crops
  const [editFarmer, setEditFarmer] = useState(null); // For editing farmer
  const [editCrop, setEditCrop] = useState(null); // For editing crop
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [isEditingFarmer, setIsEditingFarmer] = useState(true); // For switching between farmer and crop editing

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await api.get("/api/farmers/get-farmers");
        setFarmers(response.data.data);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };
    fetchFarmers();
  }, []);

  // Save farmer or crop details
  async function handleSave() {
    if (isEditingFarmer && editFarmer) {
      console.log("Saving farmer data:", editFarmer);

      if (!editFarmer || !editFarmer.farmerId) {
        console.error("Farmer ID is missing!");
        return;
      }

      try {
        const response = await api.put(`/api/farmers/${editFarmer.farmerId}`, editFarmer);
        setFarmers((prevFarmers) =>
          prevFarmers.map((farmer) =>
            farmer.farmerId === editFarmer.farmerId ? { ...farmer, ...response.data } : farmer
          )
        );
        setShowModal(false);
        setEditFarmer(null);
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (editCrop) {
      console.log("Saving crop data:", editCrop);

      try {
        const response = await api.put(
          `/api/farmers/${selectedFarmer.farmerId}/crops/${editCrop.cropId}`,
          editCrop
        );
        setFarmers((prevFarmers) =>
          prevFarmers.map((farmer) =>
            farmer.farmerId === editCrop.farmerId
              ? {
                  ...farmer,
                  producedCrops: farmer.producedCrops.map((crop) =>
                    crop.cropId === editCrop.cropId ? { ...crop, ...response.data } : crop
                  ),
                }
              : farmer
          )
        );
        setShowModal(false);
        setEditCrop(null);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  // Delete farmer
  async function handleDeleteFarmer(id) {
    if (!window.confirm("Are you sure you want to delete this farmer?")) return;

    try {
      await api.delete(`/api/farmers/${id}`);
      setFarmers((prevFarmers) => prevFarmers.filter((farmer) => farmer.farmerId !== id));
      setSelectedFarmer(null);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Delete crop
  async function handleDeleteCrop(farmerId, cropId) {
    if (!window.confirm("Are you sure you want to delete this crop?")) return;

    try {
      await api.delete(`/api/farmers/${farmerId}/crops/${cropId}`);
      setFarmers((prevFarmers) =>
        prevFarmers.map((farmer) =>
          farmer.farmerId === farmerId
            ? {
                ...farmer,
                producedCrops: farmer.producedCrops.filter((crop) => crop.cropId !== cropId),
              }
            : farmer
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Container>
      <h2 className="mt-4">Farmers List</h2>

      {/* Farmers Table */}
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone No.</th>
            <th>Email</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer, index) => (
            <tr key={farmer.farmerId}>
              <td>{index + 1}</td>
              <td
                style={{ cursor: "pointer", color: "black" }}
                onClick={() => setSelectedFarmer(farmer)}
              >
                {farmer.name}
              </td>
              <td>{farmer.contact.phone}</td>
              <td>{farmer.contact.email}</td>
              <td>{farmer.farmLocation}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setEditFarmer(farmer);
                    setIsEditingFarmer(true);
                    setShowModal(true);
                  }}
                >
                  <Pencil />
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  variant="danger"
                  onClick={() => handleDeleteFarmer(farmer.farmerId)}
                >
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Crops Table under Farmer Details */}
      {selectedFarmer && (
        <div>
          <h4 className="mt-4">Crops of {selectedFarmer.name}</h4>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Crop ID</th>
                <th>Crop Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Price per Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedFarmer.producedCrops.map((crop) => (
                <tr key={crop.cropId}>
                  <td>{crop.cropId}</td>
                  <td>{crop.cropName}</td>
                  <td>{crop.category}</td>
                  <td>{crop.quantity}</td>
                  <td>{crop.unit}</td>
                  <td>₹{crop.pricePerUnit}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setEditCrop(crop); // Set the crop to be edited
                        setIsEditingFarmer(false); // We're editing a crop
                        setShowModal(true); // Show the modal
                      }}
                    >
                      <Pencil />
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCrop(selectedFarmer.farmerId, crop.cropId)}
                    >
                      <Trash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditingFarmer ? "Edit Farmer" : "Edit Crop"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {isEditingFarmer && editFarmer && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editFarmer.name}
                    onChange={(e) =>
                      setEditFarmer({ ...editFarmer, name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={editFarmer.contact.phone}
                    onChange={(e) =>
                      setEditFarmer({
                        ...editFarmer,
                        contact: { ...editFarmer.contact, phone: e.target.value },
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={editFarmer.contact.email}
                    onChange={(e) =>
                      setEditFarmer({
                        ...editFarmer,
                        contact: { ...editFarmer.contact, email: e.target.value },
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={editFarmer.farmLocation}
                    onChange={(e) =>
                      setEditFarmer({ ...editFarmer, farmLocation: e.target.value })
                    }
                  />
                </Form.Group>
              </>
            )}

            {!isEditingFarmer && editCrop && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Crop Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editCrop.cropName}
                    onChange={(e) =>
                      setEditCrop({ ...editCrop, cropName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={editCrop.category}
                    onChange={(e) =>
                      setEditCrop({ ...editCrop, category: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={editCrop.quantity}
                    onChange={(e) =>
                      setEditCrop({ ...editCrop, quantity: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Unit</Form.Label>
                  <Form.Control
                    type="text"
                    value={editCrop.unit}
                    onChange={(e) =>
                      setEditCrop({ ...editCrop, unit: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price per Unit</Form.Label>
                  <Form.Control
                    type="number"
                    value={editCrop.pricePerUnit}
                    onChange={(e) =>
                      setEditCrop({ ...editCrop, pricePerUnit: e.target.value })
                    }
                  />
                </Form.Group>
              </>
            )}

            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
