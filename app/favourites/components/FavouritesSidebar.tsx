export interface ExtendedHTMLElement extends HTMLElement {
  _mouseDownX?: number;
  _mouseDownY?: number;
  _isDragging?: boolean;
  _dragStartedOnOverlay?: boolean;
}

function FavouritesSidebar({
  showInfo,
  setShowInfo,
  children,
}: {
  showInfo: string;
  setShowInfo: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`fixed top-0 left-0 z-200 h-screen w-screen bg-black/30 transition duration-200 ${showInfo ? "" : "pointer-events-none"}`}
      style={{
        opacity: showInfo ? "1" : "0",
      }}
      onMouseDown={(e) => {
        const target = e.currentTarget as ExtendedHTMLElement;
        // Only track if the mouse down started directly on the overlay (not on sidebar)
        if (e.target === e.currentTarget) {
          target._mouseDownX = e.clientX;
          target._mouseDownY = e.clientY;
          target._isDragging = false;
          target._dragStartedOnOverlay = true;
        } else {
          target._dragStartedOnOverlay = false;
        }
      }}
      onMouseMove={(e) => {
        const target = e.currentTarget as ExtendedHTMLElement;
        // Only track movement if drag started on overlay
        if (target._dragStartedOnOverlay && target._mouseDownX !== undefined) {
          const moveThreshold = 5;
          const movedX = Math.abs(e.clientX - target._mouseDownX);
          const movedY = Math.abs(e.clientY - (target._mouseDownY ?? 0));

          if (movedX > moveThreshold || movedY > moveThreshold) {
            target._isDragging = true;
          }
        }
      }}
      onMouseUp={(e) => {
        const target = e.currentTarget as ExtendedHTMLElement;
        // Only process if drag started on overlay
        if (target._dragStartedOnOverlay) {
          const moveThreshold = 5;
          const movedX = Math.abs(e.clientX - (target._mouseDownX || 0));
          const movedY = Math.abs(e.clientY - (target._mouseDownY || 0));

          // If it was a drag gesture (mouse moved significantly) OR a click
          if (
            target._isDragging ||
            (movedX < moveThreshold && movedY < moveThreshold)
          ) {
            setShowInfo("");
          }
        }
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as ExtendedHTMLElement;
        // Only hide if drag started on overlay and mouse leaves while dragging
        if (target._dragStartedOnOverlay && target._isDragging) {
          setShowInfo("");
        }
      }}
    >
      {children}
    </div>
  );
}

export default FavouritesSidebar;
