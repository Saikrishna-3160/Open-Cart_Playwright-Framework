import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";

test.use({
  baseURL: process.env.API_BASE_URL,
});

test("Create GET API Request using the id taken from the POST request", async ({
  request,
}) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalPrice = faker.number.int({ min: 1000, max: 10000 });

  const requestBody = {
    firstname: firstName,
    lastname: lastName,
    totalprice: totalPrice,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-04-04",
      checkout: "2026-04-10",
    },
    additionalneeds: "Breakfast",
  };

  const response = await request.post("/booking", { data: requestBody });

  const jsonResponse = await response.json();
  console.log(
    "POST API response body " + JSON.stringify(jsonResponse, null, 2),
  );

  expect(response.status()).toBe(200);
  expect(response.statusText()).toBe("OK");

  //GET API request, get details of a record using path parameter
  const bookingId = jsonResponse.bookingid;
  console.log("Booking Id: " + bookingId);

  const getAPIresponse = await request.get(`/booking/${bookingId}`);

  //Validate status code, status text
  expect(getAPIresponse.status()).toBe(200);
  expect(getAPIresponse.statusText()).toBe("OK");

  //Filter the GET API request using query parameters
  const getAPIfilterResponse = await request.get("/booking", {
    params: {
      firstname: firstName,
      lastname: lastName,
    },
  });

  //Validate the status code, status text
  expect(getAPIfilterResponse.status()).toBe(200);
  expect(getAPIfilterResponse.statusText()).toBe("OK");

  //Print the GET API response
  const getFilterAPIresponse = await getAPIfilterResponse.json();
  console.log(
    "GET filter API response: " + JSON.stringify(getFilterAPIresponse, null, 2),
  );
});
