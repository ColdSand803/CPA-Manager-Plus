import { act } from 'react';
import { create, type ReactTestRenderer } from 'react-test-renderer';
import { describe, expect, it } from 'vitest';
import { DynamicLogo } from './DynamicLogo';

describe('DynamicLogo', () => {
  it('renders default logo (version 3) with svg and title', async () => {
    let renderer: ReactTestRenderer | null = null;
    await act(async () => {
      renderer = create(<DynamicLogo size={32} />);
    });
    const root = renderer!.root;
    const span = root.findByType('span');
    expect(span.props.role).toBe('img');
    expect(span.props.style.width).toBe(32);
    expect(span.props.style.height).toBe(32);

    const svg = root.findByType('svg');
    expect(svg.props.viewBox).toBe('0 0 100 100');

    const title = root.findByType('title');
    expect(title.children).toEqual(['co1dsand']);
  });

  it('supports version 1 and version 2', async () => {
    let r1: ReactTestRenderer | null = null;
    let r2: ReactTestRenderer | null = null;
    let r3: ReactTestRenderer | null = null;

    await act(async () => {
      r1 = create(<DynamicLogo version={1} />);
      r2 = create(<DynamicLogo version={2} />);
      r3 = create(<DynamicLogo version={3} />);
    });

    expect(r1!.root.findByProps({ className: 'logo1-nib-0' })).toBeTruthy();
    expect(r2!.root.findByProps({ className: 'logo2-nib-0' })).toBeTruthy();
    expect(r3!.root.findByProps({ className: 'logo3-nib-0' })).toBeTruthy();
  });

  it('applies custom size and className', async () => {
    let renderer: ReactTestRenderer | null = null;
    await act(async () => {
      renderer = create(<DynamicLogo size={48} className="custom-logo" />);
    });
    const span = renderer!.root.findByType('span');
    expect(span.props.className).toContain('custom-logo');
    expect(span.props.style.width).toBe(48);
    expect(span.props.style.height).toBe(48);
  });

  it('generates unique mask ids for multiple instances', async () => {
    let r1: ReactTestRenderer | null = null;
    let r2: ReactTestRenderer | null = null;
    await act(async () => {
      r1 = create(<DynamicLogo version={3} />);
      r2 = create(<DynamicLogo version={3} />);
    });
    const mask1 = r1!.root.findByType('mask');
    const mask2 = r2!.root.findByType('mask');
    expect(mask1.props.id).not.toBe(mask2.props.id);
  });
});
