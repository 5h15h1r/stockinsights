const handler = require('../pages/api/announcements/company').default;
const connectMongoDB = require('../libs/db');
const Companies = require('../model/companies');

// Mock the dependencies
jest.mock('../libs/db', () => jest.fn());
jest.mock('../model/companies', () => ({
  find: jest.fn(),
}));

// Mock the response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Test suite for the handler function
describe('Test handler function', () => {
  // Test case for a successful response
  it('should handle a successful GET request', async () => {
    // Mock the request object
    const req = {
      method: 'GET',
      query: {
        scripId: '531147,530133',
        startDate: '2023-07-20',
        endDate: '2023-07-25',
        critical: true,
        recentAnnouncements: true,
        page: 1,
        limit: 10,
      },
    };

    // Mock the response object
    const res = mockResponse();

    // Mock the result returned by the Companies.find method
    const mockCompanies = [{ /* mock company data */ }];
    Companies.find.mockResolvedValue(mockCompanies);

    // Call the handler function with the mock request and response objects
    await handler(req, res);

    // Add your assertions for the response here
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ nhBits: mockCompanies.length, companies: mockCompanies });
  });
});
