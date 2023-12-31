export type TestGroup = {
  _id: string;
  title: string;
};

export type TestCase = {
  request: {
    route: string;
    method: "GET";
  };
  expectReturnCode: number;
  title: string;
  testGroup?: string;
  keyConditions?: Record<
    string,
    {
      conditions: {
        value: string;
        operator: "equals";
      }[];
      oneOf: boolean;
      fieldOptional: boolean;
    }
  >;
};

export type TestCaseWithId = TestCase & {
  _id: string;
};

export type TestReport = {
  _id: string;
  title: string;
  totalTestDuration: number;
  successPercentage: number;
};

export type TestReportWithCaseResults = TestReport & {
  tesCaseResults: {
    _id: string;
    actualReturnCode: number;
    responseTime: number;
    responseBody: string;
    testReportId: string;
    errorMessages: string[];
    case: TestCase;
  }[];
};
