import app from "../src/app";
import supertest from "supertest";

const request = supertest(app);

describe("Image APIS", () => {
  describe("GET /api/image/get", () => {
    it("should return a valid image", async () => {
      const response = await request.get(
        "/api/image/get/0c645048-1447-48cf-8e5f-8da6bacdfb25.png"
      );
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
    });

    it("should return not found image", async () => {
      const response = await request.get(
        "/api/image/get/0c645048-1447-48cf-8e5f-8da6bacdfb2.png"
      );
      expect(response.status).toBe(404);
      expect(response.body.error).not.toBeNull();
    });
  });
});
