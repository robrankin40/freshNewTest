/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Section} from '../../src/components/Section';

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Section renders correctly', () => {
  renderer.create(<Section title="Title">Body</Section>);
});

it('Section renders props correctly', () => {
  const testRenderer = renderer.create(<Section title="Title">Body</Section>);
  const testInstance = testRenderer.root;
  expect(
    testInstance.findByProps({testID: 'section_title'}).props.children,
  ).toBe('Title');
  expect(
    testInstance.findByProps({testID: 'section_body'}).props.children,
  ).toBe('Body');
});
