import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { TokenAddition } from "../generated/schema"
import { TokenAddition as TokenAdditionEvent } from "../generated/ConverterRegistryContract/ConverterRegistryContract"
import { handleTokenAddition } from "../src/converter-registry-contract"
import { createTokenAdditionEvent } from "./converter-registry-contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _token = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newTokenAdditionEvent = createTokenAdditionEvent(_token)
    handleTokenAddition(newTokenAdditionEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("TokenAddition created and stored", () => {
    assert.entityCount("TokenAddition", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "TokenAddition",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_token",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
