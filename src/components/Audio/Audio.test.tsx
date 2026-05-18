import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AudioPlayer from './Audio';

describe('Audio', () => {
  const mockPlay = vi.fn();
  const mockPause = vi.fn();

  beforeEach(() => {
    window.HTMLMediaElement.prototype.play =
      mockPlay.mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = mockPause;
    mockPlay.mockClear();
    mockPause.mockClear();
  });

  it('renders button with icon', () => {
    render(<AudioPlayer cry="test-audio.ogg" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    const svg = screen.getByLabelText('audio-play');
    expect(svg).toBeInTheDocument();
  });

  it('calls play when button is clicked and audio is not playing', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer cry="test-audio.ogg" />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it('calls pause when button is clicked and audio is playing', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer cry="test-audio.ogg" />);

    const button = screen.getByRole('button');

    await user.click(button);
    expect(mockPlay).toHaveBeenCalledTimes(1);

    await user.click(button);
    expect(mockPause).toHaveBeenCalledTimes(1);
  });

  it('handles audio end event and resets isPlaying state', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer cry="test-audio.ogg" />);

    const button = screen.getByRole('button');
    await user.click(button);

    const audioElement = screen.getByLabelText('cry-audio');
    expect(audioElement).toBeInTheDocument();

    await waitFor(() => {
      const endedEvent = new Event('ended');
      audioElement.dispatchEvent(endedEvent);
    });

    await user.click(button);
    expect(mockPlay).toHaveBeenCalledTimes(2);
  });

  it('sets correct audio src attribute', () => {
    const cryUrl = 'https://example.com/cry.ogg';
    render(<AudioPlayer cry={cryUrl} />);

    const audioElement = screen.getByLabelText('cry-audio');
    expect(audioElement).toHaveAttribute('src', cryUrl);
  });

  it('toggles isPlaying state correctly on multiple clicks', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer cry="test-audio.ogg" />);

    const button = screen.getByRole('button');

    await user.click(button);
    expect(mockPlay).toHaveBeenCalledTimes(1);

    await user.click(button);
    expect(mockPause).toHaveBeenCalledTimes(1);

    await user.click(button);
    expect(mockPlay).toHaveBeenCalledTimes(2);
  });

  it('resets isPlaying when another card is selected and cry changes', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<AudioPlayer cry="test-audio-1.ogg" />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockPlay).toHaveBeenCalledTimes(1);
    mockPlay.mockClear();

    rerender(<AudioPlayer cry="test-audio-2.ogg" />);

    await user.click(button);
    expect(mockPlay).toHaveBeenCalledTimes(1);
    expect(mockPause).not.toHaveBeenCalled();
  });
});
