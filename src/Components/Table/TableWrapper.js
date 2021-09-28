import styled from "styled-components";

export const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;

  .main {
    width: 80%;
    display: flex;
    flex-direction: column;

    .heading {
      align-self: flex-start;
    }
    .loader {
      align-self: center;
    }
  }
`;
